import os
import frontmatter
import json
from datetime import datetime
import uuid
import re

def convert_markdown_to_lexical(markdown_content):
    """Convert markdown content to Ghost's Lexical format"""
    return {
        "root": {
            "children": [
                {
                    "children": [
                        {
                            "detail": 0,
                            "format": 0,
                            "mode": "normal",
                            "style": "",
                            "text": markdown_content,
                            "type": "text",
                            "version": 1
                        }
                    ],
                    "direction": "ltr",
                    "format": "",
                    "indent": 0,
                    "type": "paragraph",
                    "version": 1
                }
            ],
            "direction": "ltr",
            "format": "",
            "indent": 0,
            "type": "root",
            "version": 1
        }
    }

def sanitize_slug(text):
    """Generate a Ghost-compatible slug from text"""
    slug = re.sub(r'[^\w\s-]', '', text).strip().lower()
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug

def convert_mdx_to_ghost_import(mdx_directory, output_file):
    # Initialize Ghost export structure
    ghost_export = {
        "db": [
            {
                "meta": {
                    "exported_on": int(datetime.now().timestamp() * 1000),
                    "version": "5.71.0"
                },
                "data": {
                    "users": [
                        {
                            "id": "1",
                            "name": "Prajwal P",
                            "slug": "prajwal",
                            "email": "ghost@devcoffee.me",
                            "created_at": datetime.now().isoformat() + "Z",
                            "updated_at": datetime.now().isoformat() + "Z"
                        }
                    ],
                    "posts": [],
                    "posts_authors": [],
                    "tags": [],
                    "posts_tags": []
                }
            }
        ]
    }

    post_id = 1
    tag_id = 1
    posts_tags_id = 1

    for filename in os.listdir(mdx_directory):
        if filename.endswith('.mdx'):
            file_path = os.path.join(mdx_directory, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                post = frontmatter.loads(f.read())

            # Process dates
            post_date = post.metadata.get("date", datetime.now())
            if isinstance(post_date, str):
                try:
                    post_date = datetime.fromisoformat(post_date.replace('Z', '+00:00'))
                except:
                    post_date = datetime.now()

            # Generate slug
            slug = sanitize_slug(post.metadata.get("slug", os.path.splitext(filename)[0]))

            # Convert content to Lexical format
            lexical_content = convert_markdown_to_lexical(post.content)

            # Create post object
            ghost_post = {
                "id": str(post_id),
                "uuid": str(uuid.uuid4()),
                "title": post.metadata.get("title", "Untitled Post"),
                "slug": slug,
                "mobiledoc": None,
                "lexical": json.dumps(lexical_content),
                "html": post.content,
                "comment_id": str(post_id),
                "feature_image": post.metadata.get("coverImage"),
                "featured": 0,
                "type": "post",
                "status": "draft" if post.metadata.get("draft", False) else "published",
                "created_at": post_date.isoformat() + "Z",
                "updated_at": post_date.isoformat() + "Z",
                "published_at": post_date.isoformat() + "Z",
                "custom_excerpt": post.metadata.get("excerpt", ""),
                "visibility": "public",
                "authors": [{"id": "1"}]
            }

            # Add post to export
            ghost_export["db"][0]["data"]["posts"].append(ghost_post)

            # Handle tags/categories
            category = post.metadata.get("category")
            if category:
                tag_slug = sanitize_slug(category)
                
                # Add tag if not exists
                if not any(tag['slug'] == tag_slug for tag in ghost_export["db"][0]["data"]["tags"]):
                    ghost_tag = {
                        "id": str(tag_id),
                        "name": category,
                        "slug": tag_slug,
                        "created_at": post_date.isoformat() + "Z",
                        "updated_at": post_date.isoformat() + "Z"
                    }
                    ghost_export["db"][0]["data"]["tags"].append(ghost_tag)
                    tag_id += 1

                # Create post-tag relationship
                ghost_export["db"][0]["data"]["posts_tags"].append({
                    "id": str(posts_tags_id),
                    "post_id": str(post_id),
                    "tag_id": str(tag_id - 1)  # Use last assigned tag ID
                })
                posts_tags_id += 1

            post_id += 1

    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(ghost_export, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    MDX_DIRECTORY = "_posts"
    OUTPUT_FILE = "ghost_import.json"
    
    convert_mdx_to_ghost_import(MDX_DIRECTORY, OUTPUT_FILE)
    print(f"Ghost import file created: {OUTPUT_FILE}")
