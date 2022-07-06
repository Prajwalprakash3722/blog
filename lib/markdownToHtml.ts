// import { remark } from 'remark'
// import html from 'remark-html'

// export default async function markdownToHtml(markdown: string) {
//   const result = await remark().use(html).process(markdown)
//   return result.toString()
// }

import showdown from 'showdown'

export default async function markdownToHtml(markdown: string) {
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}
