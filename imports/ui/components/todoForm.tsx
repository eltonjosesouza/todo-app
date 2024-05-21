import { Button, TextInput, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { insertTodos } from '../services/todoService';

export const TodoForm = () => {
    const [opened, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            text: '',
        },
    });

    const handleSubmit = (values: { text: string }) => {
        insertTodos(values.text)
            .then(() => {
                form.reset();
                setOpened(false);
            })
            .catch((err) => {
                console.error('Error inserting todo:', err);
            });
    };

    return (
        <>
            <Button onClick={() => setOpened(true)}>New ToDo</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new ToDo">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group>
                        <TextInput required label="What needs to be done?" {...form.getInputProps('text')} />
                        <Button type="submit">Add Todo</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
};