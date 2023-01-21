describe('Carousel', async () => {
    const url = 'https://adobecom.github.io/caas/html/carousel.html';

    it('Carousel Title should exist', async () => {
        await browser.url(url);
        await browser.setTimeout({ script: 50000 });
        const title = await $('.consonant-CarouselInfo-collectionTitle').getText();
        await expect(title).toEqual('Lorem Ipsum');
    });

    it('All cards should appear', async () => {
        await browser.url(url);
        await browser.setTimeout({ script: 50000 });
        const grid = await $('.consonant-CardsGrid');
        await expect(grid).toHaveChildren(8);
    });

    it('You should be able to click to the next page', async () => {
        await browser.url(url);
        await browser.setTimeout({ script: 50000 });
        const nextButton = await $('.consonant-Button--next');
        await nextButton.click();
        const prevButton = await $('.consonant-Button--previous');
        await expect(prevButton).toBeDisplayed();
    });
});

