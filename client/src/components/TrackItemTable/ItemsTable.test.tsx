import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ITrackItem } from '../../@types/ITrackItem';
import { ItemsTable } from './ItemsTable';

const trackItems: ITrackItem[] = [
    { id: 1, app: 'OneHourApp', title: 'one', beginDate: 0, endDate: 3_910_000 },
    { id: 2, app: 'TwoMinuteApp', title: 'two', beginDate: 0, endDate: 158_000 },
    { id: 3, app: 'ShortApp', title: 'three', beginDate: 0, endDate: 48_000 },
];

const renderItemsTable = () =>
    render(
        <ChakraProvider>
            <ItemsTable
                data={trackItems}
                isOneDay={true}
                isSearchTable={false}
                sumTotal={4_116_000}
                manualSortBy={false}
            />
        </ChakraProvider>,
    );

describe('ItemsTable', () => {
    it('sorts duration by numeric value instead of formatted string', async () => {
        renderItemsTable();

        fireEvent.click(screen.getByRole('button', { name: 'Duration' }));

        await waitFor(() => {
            const appOrder = screen
                .getAllByRole('row')
                .slice(1)
                .map((row) => within(row).getAllByRole('cell')[1].textContent);

            expect(appOrder).toStrictEqual(['ShortApp', 'TwoMinuteApp', 'OneHourApp']);
        });
    });
});
