import { Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React from 'react';
import { Meteor } from 'meteor/meteor';

export const TodoForm = () => {
    const form = useForm({
        initialValues: {
            text: '',
        },
    });

    const handleSubmit = (values: { text: string }) => {
        Meteor.call('todos.insert', values.text, (error: any) => {
            if (error) {
                console.log('Error inserting todo', error);
            } else {
                form.reset();
            }
        });
    };

    return (
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
    );
};