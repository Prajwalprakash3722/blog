/* eslint-disable @next/next/no-img-element */
import { InferGetStaticPropsType } from "next";
import Header from "../components/header";
import Layout from "../components/layout";
import { getAllTil } from "../lib/api";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import DateFormatter from "../components/date-formatter";
import Container from "../components/container";
import markdownStyles from "../components/markdown-styles.module.css";

export const getStaticProps = async () => {
  const allPosts = getAllTil(["title", "date", "content"]);
  return {
    props: { allPosts },
    revalidate: 3600,
  };
};

function TILPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Container>
        <Header />
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-text-heading mb-3">
            Today I Learned
          </h1>
          <p className="font-body text-lg text-text-secondary max-w-xl">
            A collection of bite-sized notes on things I&apos;ve learned over
            time.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {props.allPosts.map((post) => (
            <div key={post.slug} className="bg-surface-raised rounded-md">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between items-center px-5 py-3 text-left font-display text-sm font-semibold text-text-heading hover:bg-surface-overlay rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-terminal">
                      <span>{post.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-text-muted">
                          <DateFormatter dateString={post.date} short />
                        </span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-4 w-4 text-text-secondary transition-transform`}
                        />
                      </div>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel as="div" className="px-5 pb-4">
                        <div
                          className={
                            markdownStyles["markdown"] +
                            " text-sm text-text-secondary font-body"
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
