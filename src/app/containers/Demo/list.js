import React, { useState ,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
console.log(props)
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const makeFilter =()=>{
    console.log(checked)
 let selected = checked.map((value)=>{
        if (value=="Age Less then 10"){
            return value => value.age < 10
        }
        if (value == "Male"){
            return value => value.sex == "male"
        }
        if (value == "Female"){
            return value => value.sex == "female"
        }
        if (value=="Age more then 10"){
            return value => value.age > 10
        }
        return undefined;
    })
    return selected
    
  }

  useEffect(() => {
   let arr = makeFilter();
    props.forFilter(arr);
  }, [checked]);
console.log(checked)
  return (
      <div >
    <List dense className={classes.root} style={{backgroundColor:"#f4f6f9",minHeight:380,width:269}}>
      {["Age Less then 10","Male","Female","Age more then 10"].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button>

            <ListItemText id={labelId} primary={value } />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}