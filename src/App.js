import axios from "axios";
import React from 'react';
import Modal from "./Modal";
import "./PostStyle.css"

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      modalEdit: false,
      editPostTitle: '',
      editPostId: null,
      queryResult: null
    };
  }

  componentDidMount() {
   this.getPosts()
  }

  getPosts = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then(res => {
      this.setState({ posts: res.data});
    })
    .catch(error => {
      throw new Error(error)
    });
  }

  deletePostGlobal = (id) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if(res.status === 200){
          this.deletePostLocal(id)
        }})
      .catch(error => {
        throw new Error(error)
      });
  }

  deletePostLocal = (id) => {
    const newPost = this.state.posts.filter(post => post.id !== id)
    this.setState({posts: newPost, modal: false, queryResult: true })
    setTimeout(() => {
      this.setState({ queryResult: null });
    }, 3000)
  }

  handleChange = (event)  => {
    this.setState({editPostTitle: event.target.value })
  }

  editTitleGlobal = () => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${this.state.editPostId}`, {title: this.state.editPostTitle})
      .then(res => {
        if(res.status === 200){
          this.editTitleLocal()
        }})
      .catch(error => {
        throw new Error(error)
      });
  }

  editTitleLocal = () => {
    const updatedPosts = this.state.posts.map(post => {
      if (post.id === this.state.editPostId) {
        return { ...post, title: this.state.editPostTitle };
      }
      return post;
    });

    this.setState({ posts: updatedPosts, modalEdit: false, editPostId: null, editPostTitle: '', queryResult: true  });
    setTimeout(() => {
      this.setState({ queryResult: null });
    }, 3000)
  }

  changeTitle = (id) => {
    const post = this.state.posts.find(post => post.id === id);
    if (post) {
      this.setState({ modalEdit: true, editPostId: id, editPostTitle: ''});
    }
  }

  cancelEdit = () => {
    this.setState({ modalEdit: false, editPostId: null, editPostTitle: ''});
  }

  render(){
    return(
      <div>
        <div>
          {this.state.queryResult && <div className="query-result">Операция выполнена успешно</div>}
          <Modal 
            modalEdit={this.state.editPostId}
            editPostTitle={this.state.editPostTitle}
            handleChange={this.handleChange}
            editTitleGlobal={this.editTitleGlobal}
            cancelEdit={this.cancelEdit}
          />
          <h1 className='caption'>Post List</h1>
          <div className="posts">
            {this.state.posts.map(post => (
              <div className='post' key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => this.deletePostGlobal(post.id)}>Удлаить</button>
                <button onClick={() => this.changeTitle(post.id)}>Редактировать</button>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App;