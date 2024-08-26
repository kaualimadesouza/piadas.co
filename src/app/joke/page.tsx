"use client";

import { ChevronDown, Copy, Divide, Forward, Search, X } from "lucide-react";
import { BloomFilter } from "next/dist/shared/lib/bloom-filter";
import Document from "next/document";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

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

  function generateJoke() {
    setIsjokeScreenOpen(true);
  }

  return (
    <div className="relative lg:h-screen lg:h-screen bg-black text-zinc-50 p-6">
      <div className="relative xl:border-[0.2px] border-white h-full border-opacity-40 flex lg:justify-center lg:items-center py-20 lg:py-0">
        <a className="block absolute left-5 top-5" href="/">
          <img
            className="opacity-50 hover:opacity-100 transition-all"
            src="/logo.svg"
            alt="logo"
          />
        </a>
        <div className="lg:w-1/2 mx-6 w-full space-y-3">
          <div className="w-full">
            <form className="lg:flex justify-between gap-8 items-center space-y-2">
              <div className="flex border-b-[1px] items-center opacity-50 pb-1 flex-1">
                <input
                  className="outline-none bg-transparent flex-1"
                  type="text"
                  placeholder="Piada"
                />
                <Search className="size-4" />
              </div>
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
                className="bg-[#AE0F29] w-full lg:w-48 rounded-lg px-10 py-2 font-bold hover:opacity-65 transition-all"
              >
                Gerar Piada
              </button>
            </form>
          </div>
          <div className="block lg:flex gap-4 min-h-[540px] space-y-5">
            <div className="bg-[#0D0D0D] lg:w-1/2 rounded-md">
              <iframe
                className="w-full rounded-t-md"
                height="260"
                src="https://www.youtube.com/embed/se3c29E8lqU?si=93NUcuiFqOoF9Qlb&amp;controls=0"
                //frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                //referrerpolicy="strict-origin-when-cross-origin"
                //allowfullscreen
              ></iframe>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl">Piada do urso</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setIsLiked(!isLiked);
                      }}
                    >
                      {isLiked ? (
                        <div>
                          <img
                            src="/heart-solid.svg"
                            alt="like"
                            className="text-white size-4 opacity-70 hover:opacity-100"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src="/heart-regular.svg"
                            alt="like"
                            className="text-white size-4 opacity-70 hover:opacity-100"
                          />
                        </div>
                      )}
                    </button>
                    <button onClick={openShareModal}>
                      <Forward className="size-5 opacity-70 hover:opacity-100" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Tags</h4>
                  <ul className="flex gap-3">
                    <li>
                      <div className="bg-[#AE0F29] rounded-lg px-8 py-2 font-bold text-sm hover:opacity-65 transition-all cursor-pointer">
                        Urso
                      </div>
                    </li>
                    <li>
                      <div className="bg-[#206317] rounded-lg px-8 py-2 text-sm font-bold hover:opacity-65 transition-all cursor-pointer">
                        Teimoso
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-3xl">Broxada Sinistra</h4>
                  <p className="font-thin text-xs opacity-50">
                    Broxada Sinistra é conhecido por suas conversas
                    descontraídas e bem-humoradas, abordando diversos temas com
                    uma pegada cômica e irreverente. Os episódios geralmente
                    envolvem uma mistura de discussões sobre a vida cotidiana,
                    cultura pop, atualidades e humor ácido, com os
                    apresentadores compartilhando suas opiniões de maneira
                    espontânea e sem filtro.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] lg:w-1/2 min-h-[540px] rounded-md h-16">
              <div className="px-3 flex justify-between items-center h-10 bg-[#353535] rounded-t-md">
                <h2 className="text-xs">Piada do Urso</h2>
                <div className="flex gap-2 items-center opacity-50 cursor-pointer hover:opacity-85">
                  <Copy className="size-3" />
                  <span className="text-xs font-medium">Copiar piada</span>
                </div>
              </div>
              <div className="bg-[#0D0D0D] w-full flex-1 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
