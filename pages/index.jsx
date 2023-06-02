import Head from "next/head";
import Todo from "@/components/Todolist";


export default function Home() {

  return (
    <>
      <Head>
        <title>sharjeel</title>
      </Head>
      <div className="h-96 bg-[#f688ed] ">
       <Todo/>
      </div>
    </>
  );
}
