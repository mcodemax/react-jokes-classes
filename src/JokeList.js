import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }


class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.numJokesToGet = this.props.numJokesToGet ? this.props.numJokesToGet : 10;
    this.state = { jokes: [] };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);

  }

  //make a this.setState to update this.state.jokes arr
  setJokes(arrOfJokes) {
    this.setState({jokes: [...arrOfJokes]})
  }

  async getJokes() {
    let j = [...this.state.jokes];
    let seenJokes = new Set();
    try {
      while (j.length < this.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setJokes(j);
    } catch (e) {
      console.log(e);
    }
  }

  //prob need an async component did mount to mimic useEffect
  /** get jokes if no jokes */
  async componentDidMount() {
    this.getJokes()

    if (this.state.jokes.length === 0) this.getJokes();
  }

  async componentDidUpdate(prevProps, prevState) {
    // if we received a new todo, we need to fetch its data
    if (JSON.stringify(prevState.jokes) !== JSON.stringify(this.props.jokes)) { //Q: not sure about this conditional if correct
      this.getJokes();
    }
  };

  
  /* empty joke list and then call getJokes */
  generateNewJokes() {
    this.setJokes([]);
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    //might be wrong. might need to alter callback //we don't have access to jokes as a variable here like in nonclass componenets
    const rearrangedJokes = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));

    this.setJokes(rearrangedJokes);
  }

  /* render: either loading spinner or list of sorted jokes. */
  render() {
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
    
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    }
  
    return null;
  }

}

export default JokeList;