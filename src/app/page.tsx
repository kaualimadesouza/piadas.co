"use client";

import { ChevronDown, Link, Search, X } from "lucide-react";
import { useRouter } from "next/router";
import path from "path";
import { FormEvent, useState } from "react";

export default function Home() {
  const [isjokeScreenOpen, setIsjokeScreenOpen] = useState(false);
  const [isVisibleCreator, setIsVisible] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  function closeShareModal() {
    setShareModal(false);
  }

  function openShareModal() {
    setShareModal(true);
  }

  function like(a: boolean) {
    setIsLiked(!a);
  }

  function openJokeScreen() {
    setIsjokeScreenOpen(true);
  }

  function openCreatorTab(event: FormEvent) {
    event.preventDefault();
    setIsVisible(true);
  }

  function selectCreator(creator: any) {
    console.log(creator);
    setIsVisible(false);
  }

  function handleCreators(event: FormEvent, t: number, l: number) {
    event.preventDefault();

    setPositionY(t);
    setPositionX(l);

    setIsVisible(true);
  }

  return (
    <div className="relative lg:h-screen h-screen bg-black text-zinc-50 p-6">
      <div className="relative xl:border-[0.2px] border-white h-full border-opacity-40 flex justify-center items-center py-20 lg:py-0">
        <a className="block absolute left-5 top-5" href="/">
          <img
            className="opacity-50 hover:opacity-100 transition-all"
            src="/logo.svg"
            alt="logo"
          />
        </a>
        {!isjokeScreenOpen ? (
          <div className="space-y-5">
            <div className="text-center xl:w-[580px] w-[350px] space-y-4 m-auto">
              <h1 className="font-bold md:text-6xl text-4xl">Piadas.co</h1>
              <p className="font-thin text-sm opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="/joke" className="inline-block m-auto bg-[#AE0F29] rounded-lg md:px-10 px-8 py-4 font-bold hover:opacity-65 transition-all">
                Gerar Piada
              </a>
            </div>

            <div className="hidden md:flex gap-5 items-center opacity-50 justify-center">
              <div className="h-px bg-white md:w-full w-1/4"></div>
              <div className="">or</div>
              <div className="h-px bg-white md:w-full w-1/4"></div>
            </div>

            <div className="hidden md:flex">
              <form className="md:flex md:justify-between gap-5 md:items-center">
                <div className="flex border-b-[1px] items-center opacity-50 pb-1 gap-2">
                  <input
                    className="outline-none bg-transparent flex-1"
                    type="text"
                    placeholder="Piada"
                  />
                  <Search className="size-4" />
                </div>
                <div></div>
                <div>
                  <button
                    onClick={(event) =>
                      handleCreators(
                        event,
                        event.currentTarget.offsetTop + 60,
                        event.currentTarget.offsetLeft + 25
                      )
                    }
                    className="flex gap-2 items-center"
                  >
                    <span className="opacity-50 ">Criador Aleatorio</span>
                    <ChevronDown />
                  </button>

                  {isVisibleCreator && (
                    <ul
                      className="fixed left-0 p-5 bg-zinc-800 shadow-shape rounded-md space-y-2"
                      style={{ top: positionY, left: positionX }}
                    >
                      <li
                        className="opacity-50 hover:opacity-80 cursor-pointer"
                        onClick={(event) =>
                          selectCreator(event.currentTarget.innerText)
                        }
                      >
                        Broxada Sinistra
                      </li>
                      <li className="opacity-50 hover:opacity-80 cursor-pointer">
                        Leo Lins
                      </li>
                      <li className="opacity-50 hover:opacity-80 cursor-pointer">
                        Murilo Couto
                      </li>
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-[#AE0F29] rounded-lg px-10 py-4 font-bold hover:opacity-65 transition-all"
                >
                  Gerar Piada
                </button>
              </form>
            </div>
          </div>
        ) : (
          <h1>c</h1>
        )}
      </div>
      {shareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 ">
          <div className="bg-[#202020] p-10 shadow-shape rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">Partilhar</h3>
              <button onClick={closeShareModal}>
                <X className="opacity-50 hover:opacity-100 transition-all" />
              </button>
            </div>
            <div className="px-3 py-4 bg-black min-w-[300px] rounded-md shadow-shape space-x-7">
              <span className="text-sm">
                https://www.youtube.com/watch?v=se3c29E8lqU
              </span>
              <button className="text-sm bg-white text-black px-3 py-2 rounded-lg font-bold hover:opacity-80 transition-all">
                Copiar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
