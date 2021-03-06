import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn();

describe('Runtime Label', () => {
    let logger: Logger<'foo' | 'bar'>;

    beforeAll(() => {
        logger = createLogger(
            {
                foo: {
                    label: {
                        length: 10,
                        calculate: () => {
                            return chalk.greenBright(
                                '[' +
                                new Date('apr 20 1889')
                                    .toTimeString()
                                    .slice(0, 8) +
                                ']'
                            );
                        },
                    },
                    newLine: '| ',
                    newLineEnd: '\\-',
                },
                bar: {
                    label: chalk.redBright`[BAR]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                    divider: ' | ',
                },
            },
            { padding: 'PREPEND', color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should use runtime generated label', () => {
        logger.foo('This is a cool logging library');
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[00:00:00]')} This is a cool logging library`
        );
    });

    it('should use predefined label', () => {
        logger.bar('This is even cooler');
        expect(logFunction).toBeCalledWith(
            `     ${chalk.redBright('[BAR]')} | This is even cooler`
        );
    });
});
