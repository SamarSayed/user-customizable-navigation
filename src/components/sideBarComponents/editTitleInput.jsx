import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';

export default function EditTitleInputComponent({item, handleToggleEditTitle, updateNavItem}){
    const [inputValue, setInputValue] = React.useState(item.title);
    
    const updateItemName = () =>{
        updateNavItem(item, 'title', inputValue)
        handleToggleEditTitle(false)
    }

    return(
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="title-input"
            type='text'
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            error= {!inputValue.length}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={updateItemName}
                  edge="end"
                >
                  <DoneIcon color='success'/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
    )
}