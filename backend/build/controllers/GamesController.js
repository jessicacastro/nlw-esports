export const GamesController = {
    index: (request, response) => {
        return response.json([
            { name: 'John Doe' },
            { name: 'Jane Doe' },
            { name: 'John Smith' },
            { name: 'Jane Smith' },
        ]);
    },
    create: (request, response) => {
        return response.json({ name: 'John Doe' });
    }
};
