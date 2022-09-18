export const AdvertisementsController = {
    index: (request, response) => {
        return response.json([
            { name: 'John Doe' },
            { name: 'Jane Doe' },
            { name: 'John Smith' },
            { name: 'Jane Smith' },
            { name: 'Allan Smith' },
        ]);
    },
    create: (request, response) => {
        return response.json({ name: 'Jane Doe' });
    }
};
