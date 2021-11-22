import React from "react";
import "./Joke.css";

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.vote = this.props.vote;
    
    this.upVote = () => { this.props.vote(this.props.id, +1) }; //see commented below upVote
    this.downVote = () => { this.props.vote(this.props.id, -1) }; //see commented below downVote
    
  }

  /*arrow f()s are anon and don't redefine this; that's why the commmented out code doesn't work*/

  // upVote() {
  //   console.log(this)
  //   this.vote(this.props.id, +1);
  // }

  // downVote() {
  //   this.vote(this.props.id, -1);
  // }
  
  render(){
    return (
    <div className="Joke">
      
      <div className="Joke-votearea">
        {console.log(this)}
        <button onClick={this.upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={this.downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {this.props.votes}
      </div>

      <div className="Joke-text">{this.props.text}</div>
    </div>
    ) 
  }
}

export default Joke;
