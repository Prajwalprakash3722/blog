/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import Header from '../components/header'
import Layout from '../components/layout'
import React from 'react'
import axios from 'axios'

interface MemeObjectWithCount extends MemeObject {
  count: number
  memes: MemeObject[]
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {

    const subReddits = [
      "funny",
      "wholesome",
      "kindness",
      "meme"
    ]

    const randomIndex = Math.floor(Math.random() * subReddits.length)
    console.log(randomIndex)
    const memeObject: MemeObjectWithCount = await (await axios.get(`https://meme-api.herokuapp.com/gimme/${subReddits[randomIndex]}/9`)).data

    return {
      props: {
        memeObject
      }
    }
  } catch (error) {
    console.error("No Memes Found")
    return {
      props: {
        memeObject: {
          count: 0,
          memes: []
        }
      }
    }
  }

}
function Roadmap(props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <Layout>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h1 className='text-5xl font-semibold text-slate-50'>
          WIP
        </h1>
        <p className='text-xl text-slate-50'>
          This page is a work in progress, but you can see some memes.
        </p>
        {props.memeObject && (
          <>
            <p className='text-xl text-slate-50'>
              Current Category:
              <strong className="capitalize border border-pink-500 text-red-500 bg-pink-100 px-5 py-1.5 rounded-full text-[10px] tracking-wide m-4">
                {props.memeObject.memes[0].subreddit} memes
              </strong>
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2'>
              {props.memeObject.memes.map((meme: MemeObject) => {
                return (
                  <div className='flex flex-col items-center justify-center' key={meme.url}>
                    <img src={meme.url}
                      className='w-1/2 h-auto'
                      alt={meme.title}
                      //apply if meme is nsfw
                      style={{ filter: meme.nsfw ? 'blur(1.5rem)' : 'none' }}
                    />
                    {
                      meme.nsfw &&
                      <button className='absolute inline-block px-12 py-3 text-sm font-medium text-white bg-red-600 border border-red-600 rounded active:text-red-500 hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring'
                        onClick={() => {

                          alert('Sorry Not Possible on My Site.')

                        }}
                      >
                        Do You want to see this meme?
                      </button>
                    }
                    {meme.nsfw ? <span className='text-red-500'>NSFW</span> : <p className='text-xl text-slate-50 max-w-2xl p-4'>{meme.title}</p>}
                  </div>
                )
              }
              )}
            </div>
            <footer className="">
              <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
                    Meme API Copyright &copy; <a href="
              https://github.com/D3vd" className="text-indigo-400 hover:text-gray-500" target="_blank">
                      @D3vd
                    </a>. | Source Can be found <a href="
              https://github.com/D3vd/Meme_Api" className="text-indigo-400 hover:text-gray-500" target="_blank">
                      here
                    </a>.
                  </p>
                </div>
              </div>
            </footer>
          </>

        )}
      </div>
    </Layout>
  )
}

export default Roadmap