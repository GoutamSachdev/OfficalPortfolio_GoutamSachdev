import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import { LinkedInIcon } from "@/components/Icon";
import project1 from "../../public/images/projects/python.png"
import project2 from "../../public/images/projects/hanker.png"

import Link from "next/link";
import Image from "next/image";
const FeaturedCerticate = ({ title, summary, img, link, github }) => {
  return (
    <article className="w-full flex flex-col item-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative">
      <Link
        href={link}
        target="_blank"
        className="w-full  cursor-pointer overflow-hidden rounded-lg"
      >
        <Image src={img} alt={title} className="w-full h-auto" />
      </Link>
      <div className="w-full  flex flex-col items-start justify-between mt-4">
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2 "
        >
          <h2 className="my-2 w-full text-left text-3xl  font-bold  ">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark ">{summary}</p>
        <div className=" w-full mt-2 flex  items-center justify-between ">
          <Link href={github} target="_blank" className="w-10">
            <LinkedInIcon />{" "}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg  bg-primaryDark text-mixColr-0 p-2   px-6 text-lg font-semibold "
          >
            Go to
          </Link>
        </div>

        <span></span>
      </div>
    </article>
  );
};

const articles = () => {
  return (
    <>
      <Head>
        <title> Goutam Sachdev | Articles Page </title>
        <meta
          name="description "
          content="@GoutamSachdev Portfolio Computer Science  "
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden">
        <Layout className="pt-16">
          <AnimatedText text={"Everything will be here "} className="mb-16 " />
          <ul className="grid grid-cols-2 gap-16">
            <li>
            <FeaturedCerticate
                title={"Intermediate Python"}
                summary={
                  "DataCamp |  Credential ID #30,476,652"
                }
                img={project1}
                link={"https://www.linkedin.com/in/goutam-sachdev-978435190/details/certifications/"}
                github={
                  "https://www.datacamp.com/statement-of-accomplishment/course/7df9722485989a6d328a7be6f700053257ea5c32?raw=1"
                }
              />
            </li>
            <li>
            <FeaturedCerticate
                title={"Problem Solving Certificate"}
                summary={
                  "HackerRank |  Credential ID : De583633d481"
                }
                img={project2}
                link={"https://www.linkedin.com/in/goutam-sachdev-978435190/details/certifications/"}
                github={
                  "https://www.hackerrank.com/certificates/iframe/de583633d481"
                }
              />
            </li>
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default articles;
