"use client";

import { Creator } from "@/interfaces/Creator";
import { Joke } from "@/interfaces/Joke";
import axios from "axios";
import { Check, ChevronDown, Copy, Forward, Search, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [isVisibleCreator, setIsVisible] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [joke, setJoke] = useState<Joke>();
  const [creator, setCreator] = useState<Creator>();
  const [jokeText, setJokeText] = useState("");
  const [tags, setTags] = useState([""]);
  const [isCopied, setIsCopied] = useState(false);
  const [allCreators, setAllCreators] = useState<Creator[]>([]);
  const [pickCreator, setPickCreator] = useState("");
  const [search, setSearch] = useState("");

  function getRandomIndex(arr: []) {
    return Math.floor(Math.random() * arr.length);
  }

  async function getJokes() {
    const c = await axios.get("/api/joke");
    const { jokes } = c.data;
    const randomJoke: Joke = jokes[getRandomIndex(jokes)];

    const tagsJoke = randomJoke.tags.split(", ");
    setTags(tagsJoke);

    setJokeText(randomJoke.text.replace(/_/g, "<br />"));
    setPickCreator(randomJoke.creator.replaceAll("_", " "));

    setJoke(randomJoke);
    const cre = await axios.get(`/api/creator/${randomJoke.creator}`);
    setCreator(cre.data.creator);

    const allCreators = await axios.get(`/api/creator`);
    setAllCreators(allCreators.data.creators);

    if (!creator?.name) {
      return;
    }

    setPickCreator(creator.name.replaceAll("_", " "));
  }

  useEffect(() => {
    getJokes();
  }, []);

  function closeShareModal() {
    setShareModal(false);
  }

  function openShareModal() {
    setShareModal(true);
  }

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

  function copyJoke() {
    if (!joke?.text) {
      return;
    }

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    navigator.clipboard.writeText(joke?.text.replaceAll("<br>", ""));
  }

  function copyJokeUrl() {
    if (!joke?.video_url) {
      return;
    }

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    navigator.clipboard.writeText(joke?.video_url);
  }

  async function searchJoke(event: FormEvent) {
    event.preventDefault();
    console.log(pickCreator);
    try {
      if (!search) {
        const j = await axios.get(
          `/api/joke/search/${pickCreator.replaceAll(" ", "_")}`
        );
        const joke: Joke = j.data.j[getRandomIndex(j.data.j)];
        if (!joke) {
          return;
        }
        setJoke(joke);
        const tagsJoke = joke.tags.split(", ");
        setTags(tagsJoke);

        setJokeText(joke.text.replace(/_/g, "<br />"));
        setPickCreator(joke.creator.replaceAll("_", " "));

        const cre = await axios.get(`/api/creator/${joke.creator}`);
        setCreator(cre.data.creator);
      } else {
        const j = await axios.get(
          `/api/joke/search/${pickCreator.replaceAll(" ", "_")}/${search}`
        );
        const joke: Joke = j.data.j[getRandomIndex(j.data.j)];
        if (!joke) {
          return;
        }
        setJoke(joke);
        const tagsJoke = joke.tags.split(", ");
        setTags(tagsJoke);

        setJokeText(joke.text.replace(/_/g, "<br />"));
        setPickCreator(joke.creator.replaceAll("_", " "));

        const cre = await axios.get(`/api/creator/${joke.creator}`);
        setCreator(cre.data.creator);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative lg:h-screen bg-black text-zinc-50 p-2 lg:p-6">
      <div className="relative lg:border-[0.2px] border-white h-full border-opacity-40 flex lg:justify-center lg:items-center py-20 lg:py-0">
        <a className="block absolute left-5 top-5" href="/">
          <img
            className="opacity-50 hover:opacity-100 transition-all"
            src="/logo.svg"
            alt="logo"
          />
        </a>
        <div className="lg:w-4/5 xl:w-3/5 2xl:w-1/2 mx-6 w-full space-y-3">
          <div className="w-full">
            <form
              className="lg:flex justify-between gap-8 items-center space-y-2"
              onSubmit={searchJoke}
            >
              <div className="flex border-b-[1px] items-center opacity-50 pb-1 flex-1">
                <input
                  onChange={(event) => setSearch(event.currentTarget.value)}
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
                  <span className="opacity-50 ">{pickCreator}</span>
                  <ChevronDown />
                </button>

                {isVisibleCreator && (
                  <ul
                    className="fixed left-0 p-5 bg-zinc-800 shadow-shape rounded-md space-y-2 z-10"
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
              <button
                type="submit"
                className="bg-[#AE0F29] w-full lg:w-48 rounded-lg px-10 py-2 font-bold hover:opacity-65 transition-all"
              >
                Gerar Piada
              </button>
            </form>
          </div>
          <div className="block lg:flex gap-4 space-y-5 lg:space-y-0">
            <div className="bg-[#0D0D0D] lg:w-1/2 lg:h-[540px] rounded-md overflow-auto scroll-none">
              <iframe
                className="w-full rounded-t-md h-[260px] md:h-[360px] lg:h-[220px]"
                src={joke?.video_url}
                //frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                //referrerpolicy="strict-origin-when-cross-origin"
                //allowfullscreen
              ></iframe>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-base">{joke?.title}</h3>
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
                  <ul className="flex gap-3 flex-wrap">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <div className="bg-[#AE0F29] rounded-lg px-8 py-2 font-bold text-sm hover:opacity-65 transition-all cursor-pointer">
                          {tag}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-3xl">
                    {joke?.creator.replaceAll("_", " ")}
                  </h4>
                  <p className="font-thin text-xs opacity-50">
                    {creator?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] lg:w-1/2 lg:h-[540px] rounded-md overflow-auto scroll-joke">
              <div className="px-3 flex justify-between items-center h-10 bg-[#353535] rounded-t-md">
                <h2 className="text-xs">{joke?.title}</h2>
                <div onClick={copyJoke}>
                  {!isCopied ? (
                    <div className="flex gap-2 items-center opacity-50 cursor-pointer hover:opacity-85 transition-all">
                      <Copy className="size-3" />
                      <span className="text-xs font-medium">Copiar piada</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center opacity-50 cursor-pointer hover:opacity-85 transition-all">
                      <Check className="size-3" />
                      <span className="text-xs font-medium">Copiado</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-[#0D0D0D] w-full flex-1 rounded-md p-3 text-sm overflow-hidden">
                <p
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: jokeText }}
                ></p>
              </div>
            </div>
          </div>
        </div>
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
              <span className="text-sm">{joke?.video_url}</span>
              <button
                onClick={copyJokeUrl}
                className="text-sm bg-white text-black px-3 py-2 rounded-lg font-bold hover:opacity-80 transition-all"
              >
                {isCopied ? <span>Copiado</span> : <span>Copiar</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
