'use client'

import * as React from 'react';
import ListItemComponent from './listItem';
import { Collapse, List } from '@mui/material';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/itemsTypes';

export default function CollapseListItemComponent({ item, editMode, updateNavItem, findCard, moveCard, onReleaseItem, onHoldItem, handleClose}) {
    const [open, setOpen] = React.useState(false);
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: item.labelId,
        drop: () => ({ name: 'CollapseListItemComponent' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <div onClick={handleClick}>
                <ListItemComponent
                    item={item}
                    isCollapse={true}
                    open={open}
                    editMode={editMode}
                    updateNavItem={updateNavItem}
                    itemType={ItemTypes.CARD}
                    moveCard={moveCard}
                    findCard={findCard}
                    onReleaseItem={onReleaseItem}
                    onHoldItem={onHoldItem} />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                    <div ref={drop}>
                        {
                            Array.isArray(item.children) && item.children.map((childItem) => {
                                const labelId = `collapse-list-label-${item.id}-${childItem.id}-${childItem.title}`;
                                childItem['labelId'] = labelId
                                return (editMode || childItem.visible != false) && < ListItemComponent
                                    key={labelId}
                                    item={childItem}
                                    editMode={editMode}
                                    updateNavItem={updateNavItem}
                                    itemType={item.labelId}
                                    moveCard={moveCard}
                                    findCard={findCard}
                                    onReleaseItem={onReleaseItem}
                                    onHoldItem={onHoldItem} 
                                    handleClose={handleClose}/>
                            })
                        }
                    </div>
                </List>
            </Collapse>
        </>
    );
}