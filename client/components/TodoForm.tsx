import { Button, TextInput, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { insertTodo } from '/imports/api/todos/TodosRpcMethods';

export const TodoForm = () => {

    const [opened, setOpened] = useState(false);


    const form = useForm({
        initialValues: {
            text: '',
        },
    });

    const handleSubmit = (values: { text: string }) => {
        insertTodo({ text: values.text })
            .then(() => {
                form.reset();
                setOpened(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>

            <Button onClick={() => setOpened(true)}>New ToDo</Button>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add a new ToDo"
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group>
                        <TextInput
                            required
                            label="What needs to be done?"
                            {...form.getInputProps('text')}
                        />
                        <Button type="submit">Add Todo</Button>
                    </Group>
                </form>
            </Modal>

        </>
    );
};