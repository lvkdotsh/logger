import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';

const logFn = jest.fn();
const logFn2 = jest.fn();

describe('Multi Output', () => {
    let logger: Logger<'ok'>;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: {
                    label: chalk.greenBright`[OK]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                },
            },
            { padding: 'PREPEND', color: false },
            [logFn, logFn2]
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log to multiple locations', () => {
        logger.ok(
            'This is the best logging library',
            'It\'s not even a question',
            'It even supports multi\nline logs'
        );
        expect(logFn).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
            '  |  It\'s not even a question\n' +
            '  |  It even supports multi\n' +
            '  \\- line logs'
        );
        expect(logFn2).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
            '  |  It\'s not even a question\n' +
            '  |  It even supports multi\n' +
            '  \\- line logs'
        );
    });
});
