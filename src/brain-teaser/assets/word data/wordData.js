import axios from "axios";

//data
export const wordCollection = [
  { id: "0", word: "man" },
  { id: "1", word: "woman" },
  { id: "2", word: "kid" },
  { id: "3", word: "Harry potter" },
  { id: "4", word: "overWhelmed" },
  { id: "5", word: "mindfullness" },
  { id: "6", word: "minds" },
  { id: "7", word: "fucker" },
  { id: "8", word: "bullinshg" },
  { id: "9", word: "bullish market" },
  { id: "10", word: "warren" },
  { id: "11", word: "steve" },
  { id: "12", word: "elon musk" },
  { id: "13", word: "astronut" },
  { id: "14", word: "makeup man" },
  { id: "15", word: "bearishly" },
];

var options = {
  method: "GET",
  url: "https://random-words-api.vercel.app/word",
};

export const wordAPI = () =>
  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
