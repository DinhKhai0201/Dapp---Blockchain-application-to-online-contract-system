import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import HotelIcon from '@material-ui/icons/Hotel';
import HomeIcon from '@material-ui/icons/Home';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import '../static/css/card.css'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
class RecipeReviewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
         let {ipfsHash, name, address, id ,price ,des} = this.props;
        return (
          <Card className="card-s">
            {ipfsHash !== "" ? (
              <CardMedia className="media-s" image={ipfsHash} title={name} />
            ) : (
              <CardMedia className="media-s" title={name} />
            )}

            <CardContent>
              <Link to={`/detail/${id} `} style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className="display-p"
                >
                  {name.length >= 20 ? (name.substring(0, 20) + '...') : name}
                </Typography>
              </Link>
              <Typography variant="body2" color="textSecondary" component="p">
                {address.length >= 20 ? (address.substring(0, 28) + '...') : address}
              </Typography>
              <hr />
              <Typography variant="body2" color="textSecondary" component="p">
                <AttachMoneyIcon />
                {price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VND
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {des.split("_")[0]} <br />
                <HotelIcon />
              </IconButton>
              <IconButton aria-label="share">
                {des.split("_")[1]} <br />
                <HomeIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
    }
}

export default RecipeReviewCard
