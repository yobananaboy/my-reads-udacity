import React from 'react';
import { Header, Container } from 'semantic-ui-react';

export const PageHeader = () => (
    <Container
        fluid
        className="list-books-title"
    >
        <Header as="h1">MyReads</Header>
    </Container>
)