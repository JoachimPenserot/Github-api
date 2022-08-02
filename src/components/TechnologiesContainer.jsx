import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/components/technologiescontainer.sass";

const TechnologiesContainer = () => {
  const [language, setLanguage] = useState("python"); // Default language
  const [apiData, setApiData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [inputSearchLanguage, setInputSearchLanguage] = useState();
  const [favoriteList, setFavoriteList] = useState([]);

  const searchData = (e) => {
    setInputSearchLanguage(e.target.value);
  };

  const submit = () => {
    api
      .get("/search/issues?type=repositories", {
        params: { q: inputSearchLanguage },
      })
      .then((response) => {
        // console.log(response);
        setApiData(response.data.items);
        // console.log(apiData);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsloading(true);
    api
      .get("/search/issues?type=repositories", {
        params: { q: language },
      })
      .then((response) => {
        // console.log(response);
        setApiData(response.data.items);
        // console.log(apiData);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [language]);

  const updated = localStorage.getItem("favorites");

  useEffect(() => {
    if (updated === null) {
      return;
    } else {
      const newList = JSON.parse(localStorage.getItem("favorites") || null);
      setFavoriteList(newList);
    }
  }, [updated]);

  function getUsers(tech) {
    const repoSource = tech.user.html_url;
    if (localStorage.getItem("favorites") === null) {
      localStorage.setItem("favorites", JSON.stringify([repoSource]));
    } else {
      const getRepoSource = JSON.parse(localStorage.getItem("favorites"));
      const newReporSource = [...getRepoSource, repoSource];
      localStorage.setItem("favorites", JSON.stringify(newReporSource));
      setFavoriteList(newReporSource);
    }
    const updatedList = [...favoriteList];
    const index = updatedList.indexOf(repoSource);
    if (index != -1) {
      updatedList.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(updatedList));
      setFavoriteList(updatedList);
      //   repoContainer.classList.remove("fav");
    } else {
      updatedList.push(repoSource);
      localStorage.setItem("favorites", JSON.stringify(updatedList));
      setFavoriteList(updatedList);
      //   favorites.push(repoSource);
      //   repoContainer.classList.add("fav");
    }
  }
  return (
    <div>
      {/* {console.log(apiData)} */}
      <section className="about-container">
        <h2>Buscar linguagem</h2>
        <div className="fields">
          <input
            type="text"
            value={inputSearchLanguage}
            onChange={(e) => {
              searchData(e);
            }}
          />
          <a href="#" className="btn" onClick={submit}>
            Buscar
          </a>
        </div>
      </section>
      <section className="technologies-container">
        <h2>Tecnologias</h2>
        {favoriteList.map((list) => (
          <p>{list}</p>
        ))}
        <div className="technologies-grid">
          {apiData.map((tech) => (
            <div className="technology-card" id={tech.user.login} key={tech.id}>
              <img
                className="user-img"
                src={tech.user.avatar_url}
                alt={tech.user.login}
                height="48rem"
                width="48rem"
              />
              <div className="technology-info">
                <h3>{tech.user.login}</h3>
                <a className="links" href={tech.user.html_url} target="_blank">
                  More about...
                </a>
                <div
                  className="image"
                  id={tech.id}
                  onClick={() => getUsers(tech)}
                ></div>
                <p>{tech.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechnologiesContainer;