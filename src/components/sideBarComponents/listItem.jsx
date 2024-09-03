'use client'

import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import EditTitleInputComponent from './editTitleInput';
import { useDrag, useDrop } from 'react-dnd';
import Link from 'next/link'



export default function ListItemComponent({ item, isCollapse, open, editMode, updateNavItem, itemType, findCard, moveCard, onReleaseItem, onHoldItem, handleClose }) {
    const [editTitle, setEditTitle] = React.useState(false);
    const originalIndex = findCard(item.id, item.title).index
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: itemType,
            item: { id: item.id, originalIndex, title: item.title },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (cardItem, monitor) => {
                const { id: droppedId, originalIndex } = cardItem
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveCard(droppedId, originalIndex, cardItem.title)
                }
            },
        }),
        [item.id, originalIndex, moveCard],
    )

    const [, drop] = useDrop(
        () => ({
            accept: itemType,
            hover({ id: draggedId, title: draggedTitle }) {
                if (draggedId !== item.id) {
                    const { index: overIndex } = findCard(item.id, item.title)
                    moveCard(draggedId, overIndex, draggedTitle)
                }
            },
        }),
        [findCard, moveCard],
    )

    const handleToggleEditTitle = async (val) => {
        setEditTitle(val)
    };

    const handleToggleVisible = async (val) => {
        updateNavItem(item, 'visible', val)
    };

    return (
        <span onClick={handleClose ? handleClose : () => { }}>

            <Link href={item.target && !editMode ? `${item.target}` : '#'} style={{ textDecoration: 'none', color: 'unset' }}>
                <ListItem
                    className='sideBarListCard'
                    secondaryAction={
                        editMode ? <>
                            {!editTitle && <IconButton edge="end" aria-label="comments" onClick={() => handleToggleEditTitle(true)}>
                                <EditOutlinedIcon />
                            </IconButton>}
                            <IconButton edge="end" aria-label="comments">
                                {item.visible == false ? <VisibilityOutlinedIcon onClick={() => handleToggleVisible(true)} /> : <VisibilityOffOutlinedIcon onClick={() => handleToggleVisible(false)} />}
                            </IconButton>
                        </> :
                            isCollapse && <IconButton edge="end" aria-label="expand" >
                                {!editMode && (open ?
                                    <ExpandLess /> :
                                    <ExpandMore />
                                )}
                            </IconButton>

                    }
                    disablePadding
                >
                    <ListItemButton role={undefined} dense onMouseDown={onHoldItem} onMouseLeave={onReleaseItem} onMouseOut={onReleaseItem} onMouseUp={onReleaseItem}>
                        <div style={{ 'display': 'flex' }} ref={(node) => editMode ? drag(drop(node)) : node}>
                            {editMode && <ListItemIcon>
                                <DragIndicatorIcon />
                            </ListItemIcon>}
                            {
                                editTitle && editMode ? <EditTitleInputComponent item={item} handleToggleEditTitle={handleToggleEditTitle} updateNavItem={updateNavItem} /> : <ListItemText id={item.labelId} primary={item.title} color={item.visible ? 'black' : 'gray'} />
                            }
                        </div>
                    </ListItemButton>
                </ListItem>
            </Link>
        </span>
    );
}