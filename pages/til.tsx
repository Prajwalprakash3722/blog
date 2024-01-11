/* eslint-disable @next/next/no-img-element */
import { InferGetStaticPropsType } from "next";
import Header from "../components/header";
import Layout from "../components/layout";
import { getAllTil } from "../lib/api";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DateFormatter from "../components/date-formatter";
import PostTitle from "../components/post-title";
import Container from "../components/container";
import markdownStyles from "../components/markdown-styles.module.css";

export const getStaticProps = async () => {
  const allPosts = getAllTil(["title", "date", "content"]);

  return {
    props: {
      allPosts,
    },
    revalidate: 3600,
  };
};

function TILPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Container>
        <Header />
        <PostTitle>
          <h1 className="text-center m-2">Today I Learned</h1>
          <p className="text-center text-white font-sans font-light sm:font-normal tracking-wider text-xl mb-0">
            A collection of bite sized notes notes on various topics that I’ve
            learned over time.
          </p>
        </PostTitle>
        <div className="flex flex-col gap-4 p-4 text-white mx-auto">
          {props.allPosts.map((post) => (
            <div key={post.slug} className="bg-gray-800 rounded-md p-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between bg-blue-500 px-4 py-2 text-left text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                      <div className="flex justify-between w-full px-2">
                        <span>{post.title}</span>
                        <DateFormatter dateString={post.date} short={true} />
                      </div>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-white`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0">
                      <Disclosure.Panel
                        as="div"
                        className="max-w-screen-xl mx-auto text-justify">
                        <div
                          className={
                            markdownStyles["markdown"] +
                            "px-4 pb-2 pt-4 text-base text-gray-300"
                          }
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export default TILPage;
