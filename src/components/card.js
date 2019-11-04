import React, { Component} from 'react';
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import '../static/css/card.css'
class RecipeReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           

        };
    }

    render() {
         let {ipfsHash, name, address, id} = this.props;
        return (
           
                <Card className="card-s">
                    {(ipfsHash != '' )? (
                       <CardMedia
                            className="media-s"
                            image={ipfsHash}
                            title= {name}
                        />
                      ) : (
                         <CardMedia
                            className="media-s"
                            title= {name}
                        />
                      )}
                    
                        <CardContent>    
                          <Link to={`/detail/${id} `}>                 
                                <Typography variant="body2" color="textSecondary" component="p" className = "display-p">
                                {name}
                                </Typography>
                           </Link>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {address}
                            </Typography>
                        <hr />
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
             
        );
    }
}

export default RecipeReviewCard
