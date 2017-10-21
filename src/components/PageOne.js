import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class PageOne extends Component {
  render() {
    return (
        <div className="jumbotron mt">
          <div className="col-sm-8 mx-auto mt">
            <h2>Hello from an ES6 Class Component</h2>
            <p>If you’re working on a team that already understands classes, then ES6 classes are clearly easier to understand than the alternatives mentioned above. They look, feel, and operate similar to the C# and Java classes so many enterprise developers have already embraced (yes, for better or worse).</p>
            <p>Classes make it simple to declare static functions via a single keyword. There’s no need to learn a pattern.</p>
            <h3>A Bright, Standardized Future</h3>
            <p>Yes, classes put developers in an object-oriented mindset which masks the true power of JavaScript, but I look forward to a future where JavaScript code bases aren’t composed of so many different styles. ES6 classes finally give us a clear, consistent, standardized pattern to follow. Clean code is about writing code for humans, so I favor the patterns that best convey my intent. While there are certainly risks of misuse, ES6 classes provide a practical, clear path for creating JavaScript applications in a consistent style.</p>
            <p>
              <Link className="btn btn-primary" to="https://medium.com/@housecor/in-defense-of-javascript-classes-e50bf2270a95" role="button">Read Article &raquo;</Link>
            </p>
          </div>
        </div>
    );
  }
}

export default PageOne
