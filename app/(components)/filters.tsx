import React, { useEffect, useState } from 'react';
import { Card, CardActions, Button, ButtonGroup } from '@mui/material';
import { Tag } from '@/libs/interfaces';
import { apiURI } from '@/libs/constants';

interface FilterBarProps {
  onFilterClick: (tag: Tag | null) => void;
}

const Filters: React.FC<FilterBarProps> = ({ onFilterClick }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch(`${apiURI}/tags`)
    .then(response => response.json())
    .then(data => {
        setTags(data);
    })
  },[])
    
  return (
    <Card sx={{ flex:1, display: 'flex', flexWrap: 'wrap', margin: 2, justifyContent:"space-evenly", backgroundColor:"#F2ECBE" }}>
      <CardActions sx={{ flex:1, display: 'flex', flexWrap: 'wrap', justifyContent:"space-around", alignItems:"center" }}>
        <Button
          variant="contained"
          sx={{backgroundColor:"#C08261"}}
          onClick={() => onFilterClick(null)}
        >
          No Filter
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag.name}
            variant="contained"
            sx={{backgroundColor:"#C08261"}}
            onClick={() => onFilterClick(tag)}
          >
            {tag.name}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default Filters;