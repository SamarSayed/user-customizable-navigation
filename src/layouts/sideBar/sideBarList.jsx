'use client'

import * as React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { request } from '../../utils/request';
import { GetNavApi, TrackNavApi, UpdateNavApi } from '../../utils/apisConsts';
import CollapseListItemComponent from '../../components/sideBarComponents/collapseListItem';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { ItemTypes } from '../../utils/itemsTypes';
import ListItemComponent from '../../components/sideBarComponents/listItem';
import update from 'immutability-helper'
import CloseIcon from '@mui/icons-material/Close';

function SideBarList({ handleClose }) {
    const [editMode, setEditMode] = React.useState(false);
    const [navItems, setNavItems] = React.useState([]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

    const findCard = React.useCallback(
        (id, title) => {
            const card = navItems?.map((navItem, index) => {
                if (navItem.id == id && navItem.title == title) {
                    return { navItem, index }
                }
                const newChildNavItems = navItem.children ? navItem.children.filter((childNavItem) => childNavItem.id == id && title == childNavItem.title) : []
                return { navItem: newChildNavItems[0], index: navItem.children?.indexOf(newChildNavItems[0]), parent: navItem, parentIndex: index }
            }).filter((cardsArr) => cardsArr.navItem)[0]
            return {
                card: card?.navItem,
                index: card?.index,
                parent: card?.parent,
                parentIndex: card?.parentIndex
            }
        },
        [navItems],
    )
    const moveCard = React.useCallback(
        (id, atIndex, title) => {
            const { card, index, parent, parentIndex } = findCard(id, title)
            trackItems(id, index, atIndex)
            let newArr
            if (!parent) {
                newArr = update(navItems, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, card],
                    ],
                })
            }
            else {
                const childNewArr = update(parent.children, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, card],
                    ],
                })

                newArr = [...navItems]
                newArr[parentIndex].children = childNewArr
            }

            setNavItems(newArr)
        },
        [findCard, navItems, setNavItems],
    )

    React.useLayoutEffect(() => {
        getNavItems()
    }, [])

    const handleToggleEdit = async (val) => {
        setEditMode(val)
    };

    const getNavItems = async () => {
        try {
            const response = await request({ url: GetNavApi.url, method: GetNavApi.method })
            setNavItems(response.data)
        }
        catch (e) {
            console.log("🚀 ~ getNavItems ~ e:", e)
        }
    }

    const trackItems = async (id, from, to) => {
        try {
            await request({
                url: TrackNavApi.url, method: TrackNavApi.method, data: {
                    id: String(id), from: String(from), to: String(to)
                }
            })
        }
        catch (e) {
            console.log("🚀 ~ trackItems ~ e:", e)
        }
    }

    const updateNavItem = (item, key, val) => {
        const newNavItems = navItems?.map((navItem) => {
            if (navItem.id == item.id && navItem.title == item.title) {
                return ({ ...navItem, [key]: val })
            }
            const newChildNavItems = navItem.children ? navItem.children.map((childNavItem) => {
                if (childNavItem.id == item.id && childNavItem.title == item.title) {
                    return ({ ...childNavItem, [key]: val })
                }
                return childNavItem
            }) : undefined

            navItem.children = newChildNavItems
            return navItem
        })
        setNavItems(newNavItems)
    }

    const updateNav = async () => {
        try {
            const response = await request({ url: UpdateNavApi.url, method: UpdateNavApi.method, data: navItems })
            handleToggleEdit(false)
        }
        catch (e) {
            console.log("🚀 ~ updateNav ~ e:", e)
        }
    }

    const discardChanges = async () => {
        await getNavItems()
        handleToggleEdit(false)
    }

    let timeOut
    const onHoldItem = () => {
        timeOut = setTimeout(() => {
            setEditMode(true)
        }, 2000)
    }
    const onReleaseItem = () => {
        clearTimeout(timeOut)
    }

    return (
        <>
            <div className='actionBtnsContainer'>
                {!editMode && <IconButton aria-label="edit">
                    <SettingsOutlinedIcon onClick={() => handleToggleEdit(true)} />
                </IconButton>}
                {editMode &&
                    <>
                        <IconButton aria-label="done">
                            <DoneOutlineOutlinedIcon onClick={updateNav} />
                        </IconButton>
                        <IconButton aria-label="done">
                            <CloseIcon onClick={discardChanges} />
                        </IconButton>
                    </>

                }
            </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <div ref={drop} className='sideBarListCardContainer'>
                    {navItems.map((item) => {
                        const labelId = `list-label-${item.id}-${item.title}`;
                        item['labelId'] = labelId
                        return (editMode || item.visible != false) ? (
                            (Array.isArray(item.children)) ?
                                <CollapseListItemComponent
                                    key={labelId}
                                    item={item}
                                    editMode={editMode}
                                    updateNavItem={updateNavItem}
                                    moveCard={moveCard}
                                    findCard={findCard}
                                    onReleaseItem={onReleaseItem}
                                    onHoldItem={onHoldItem}
                                    handleClose={handleClose} /> :
                                <ListItemComponent
                                    onReleaseItem={onReleaseItem}
                                    onHoldItem={onHoldItem}
                                    key={labelId}
                                    item={item}
                                    editMode={editMode}
                                    updateNavItem={updateNavItem}
                                    itemType={ItemTypes.CARD}
                                    moveCard={moveCard}
                                    findCard={findCard}
                                    handleClose={handleClose} />
                        ) : '';
                    })}
                </div>
            </List>
        </>
    );
}

export default (({ handleClose }) => {
    // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // const userAgent = headers().get("user-agent") || "";
    if (typeof window !== "undefined") {
        let Backend = window.innerWidth <= 768 ? TouchBackend : HTML5Backend
        return <DndProvider backend={Backend}>
            <SideBarList handleClose={handleClose} />
        </DndProvider>
    }

    return <DndProvider backend={HTML5Backend}>
            <SideBarList handleClose={handleClose} />
        </DndProvider>
})