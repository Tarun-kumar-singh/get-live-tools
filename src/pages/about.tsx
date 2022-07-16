import type { NextPage } from 'next'
import { useEffect } from 'react'

const About: NextPage = () => {
  useEffect(() =>{
    console.log('aboutus')
  }, [])
  return (
    <div>
      An online Small text generator offers a chance to generate tiny text for all those looking to get attractive small letters without making any hard efforts. We all know that with the immense popularity of social media, tiny text’s effectiveness has increased a lot. Most of the people on social platforms use basic fonts. So, you can outshine your friends and colleagues with something unique and catchy. Also, if you are a webmaster, and want to try something different from your opponents, then using smaller text is one of the best options you can have.
      Additionally, small fonts plays a vital role in designing a handy and splendid website template. You may have observed that the sites having boring and dull fonts that usually fail to impress the audience and can’t get appropriate traffic. However, you can change all this by simply using a small text generator to get the exclusive and mesmerizing text for your web page.
    </div>
  )
}

export default About
