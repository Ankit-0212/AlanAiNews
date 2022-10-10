import React, { useEffect, useState } from "react";
import { getNews } from "../Service/getNews";
import moment from "moment/moment";
import alanBtn from '@alan-ai/alan-sdk-web';

export default function NewsData() {
  const [newsData, setNewsData] = useState([]);

  const AlanKey=`b7ef9c69a73eda1a3129f8ead41d7ca72e956eca572e1d8b807a3e2338fdd0dc/stage`
  const [selectOption,setSelectOption]=useState('')
  const getAllNews = async () => {
    let data = await getNews(selectOption);

    setNewsData(data.data.articles);
  };
  const selectCategory = (event) => {
    setSelectOption(event.target.value)
  };
  useEffect(() => {
    getAllNews();
  }, [selectOption]);
  useEffect(() => {
    alanBtn({
        key: AlanKey,
        onCommand: (commandData) => {
         setSelectOption(commandData.data)
        }
    });
  }, []);
  return (

    <div className="main">
      <h1>Alan Ai News App</h1>
      <div className="select">
        <label for="cars">Select Category : </label>

        <select className="select-box" name="category" id="category" onChange={selectCategory}
        value={selectOption}
        >
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <div className="img">
                <img
                  className="news-image"
                  src={
                    news?.urlToImage
                      ? news?.urlToImage
                      : "https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png"
                  }
                />
              </div>
              <p className="news-title">{news?.title}</p>
              <p className="news-content">{news?.content}</p>
              <div className="space-between">
                <p className="news-author">
                  Author :{" "}
                  {news?.author ? news?.author : "Author name not available"}
                </p>
                <p>Date : {moment(news?.publishedAt).format("LL")}</p>
              </div>
              <a href={news?.url} target="_blank" rel="noreferrer">
                Read More ..{" "}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
