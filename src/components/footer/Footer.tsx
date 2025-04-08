"use client";
import React from 'react'
import Footerlinks from '@/components/footer/Links'
import Footercopyright from '@/components/footer/Copyright'
import BottomarrowPhone from '@/components/footer/BottomarrowPhone';
import Script from "next/script";

const Footer = () => {
  return (
    <>
      <div className='footer py-24'>
        <div className='container m-auto px-5 lg:p-0'>
            <div className='footer-links-cont'>
              <Footerlinks/>
            </div>
            <div className='footer-bottom-cont pt-8 mt-8'>
              <Footercopyright/>
              <span id='iasBadge' data-account-id='3578'></span>
            </div>
        </div>
        <BottomarrowPhone/> 
      </div>
      <Script data-minify="1" async defer src="https://www-cdn.icef.com/scripts/iasbadgeid.js" strategy="lazyOnload"></Script>
    </>
  )
}

export default Footer
