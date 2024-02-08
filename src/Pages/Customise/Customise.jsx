/* eslint-disable no-unused-vars */
import { useGetSubFolderByIdQuery } from '@/redux/features/folder/folderApi';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../Shared/Container';

import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

import { Grid } from './Grid';
import { SortablePhoto } from './SortablePhoto';
import { Photo } from './Photo';

const Customise = () => {
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const { id } = useParams();
    const { data: folderData, isLoading } = useGetSubFolderByIdQuery(id);

    const images = folderData?.data?.Gigs.flatMap((gig) =>
        gig.GigsImage.map((gigImage) => gigImage.image)
    ) || [];

    const [items, setItems] = useState(images);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems;
            });
        }

        setActiveId(null);
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    return (
        <div className='my-10'>
            <Container>
                {
                    items.length > 0 ? <div className='border p-5 shadow-md'>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext items={items} strategy={rectSortingStrategy}>
                                <Grid columns={4}>
                                    {items.map((url, index) => (
                                        <SortablePhoto key={url} url={url} index={index} />
                                    ))}
                                </Grid>
                            </SortableContext>

                            <DragOverlay adjustScale={true}>
                                {activeId ? (
                                    <Photo url={activeId} index={items.indexOf(activeId)} />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div> : <div className='border p-5 shadow-md text-center'>
                        <p className='text-lg font-medium'>Opps... Image Not Found!</p>
                    </div>
                }
            </Container>
        </div>
    );
};

export default Customise;