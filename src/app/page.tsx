"use client";

import { ChevronDown } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Creator } from "@/interfaces/Creator";

export default function Home() {
  const [isVisibleCreator, setIsVisible] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [allCreators, setAllCreators] = useState<Creator[]>([]);
  const [pickCreator, setPickCreator] = useState("Criador Aleatorio");

  async function getJokes() {
    const allCreators = await axios.get(`/api/creator`);
    setAllCreators(allCreators.data.creators);
  }

  useEffect(() => {
    //const j = getJokes();
    //console.log(j)
    getJokes();
  }, []);

  function selectCreator(creator: any) {
    setPickCreator(creator);
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
        <div className="space-y-5">
          <div className="text-center xl:w-[580px] w-[430px] space-y-4 m-auto">
            <h1 className="font-bold md:text-6xl text-4xl">Piadas.co</h1>
            <p className="font-thin text-sm opacity-70">
              Seja bem-vindo ao Piadas.co! Aqui, você pode gerar piadas hilárias
              com apenas um clique. Escolha seu criador favorito e se divirta.
              Rir é garantido! (talvez)
            </p>
            <a
              href="/joke/randomjoke"
              className="inline-block m-auto bg-[#AE0F29] rounded-lg md:px-10 px-8 py-4 font-bold hover:opacity-65 transition-all"
            >
              Gerar Piada
            </a>
          </div>

          <div className="hidden md:flex gap-5 items-center opacity-50 justify-center">
            <div className="h-px bg-white md:w-full w-1/4"></div>
            <div className="">or</div>
            <div className="h-px bg-white md:w-full w-1/4"></div>
          </div>

          <div className="hidden md:flex">
            <div className="md:flex md:justify-center gap-5 md:items-center m-auto">
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
                  <span className="opacity-50 ">{pickCreator}</span>
                  <ChevronDown />
                </button>

                {isVisibleCreator && (
                  <ul
                    className="fixed left-0 p-5 bg-zinc-800 shadow-shape rounded-md space-y-2"
                    style={{ top: positionY, left: positionX }}
                  >
                    {allCreators.map((creator) => (
                      <li
                        key={creator._id}
                        className="opacity-50 hover:opacity-80 cursor-pointer"
                        onClick={(event) =>
                          selectCreator(event.currentTarget.innerText)
                        }
                      >
                        {creator.name.replaceAll("_", " ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {pickCreator.replaceAll(" ", "").toLowerCase() ==
              "criadoraleatorio" ? (
                <a
                  href={`/joke/randomjoke`}
                  className="bg-[#AE0F29] rounded-lg px-10 py-4 font-bold hover:opacity-65 transition-all"
                >
                  Gerar Piada
                </a>
              ) : (
                <a
                  href={`/joke/${pickCreator.replaceAll(" ", "_")}`}
                  className="bg-[#AE0F29] rounded-lg px-10 py-4 font-bold hover:opacity-65 transition-all"
                >
                  Gerar Piada
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
