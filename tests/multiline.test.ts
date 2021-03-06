import { createLogger, Logger } from '../src';

const logFunction = jest.fn();

describe('Multiline Wrapping', () => {
    let logger: Logger<'plaintext' | 'oneline' | 'twoline'>;

    beforeAll(() => {
        logger = createLogger(
            {
                plaintext: 'OK',
                oneline: { label: 'OK', newLine: '!' },
                twoline: { label: 'OK', newLine: '!', newLineEnd: '!' },
            },
            {},
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log plaintext', () => {
        logger.plaintext('Line 1', 'Line 2', 'Line 3');
        expect(logFunction).toBeCalledWith(
            'OK Line 1\n' + '├- Line 2\n' + '└- Line 3'
        );
    });
    it('should log oneline', () => {
        logger.oneline('Line 1', 'Line 2', 'Line 3');
        expect(logFunction).toBeCalledWith(
            'OK Line 1\n' + ' ! Line 2\n' + '└- Line 3'
        );
    });
    it('should log twoline', () => {
        logger.twoline('Line 1', 'Line 2', 'Line 3');
        expect(logFunction).toBeCalledWith(
            'OK Line 1\n' + ' ! Line 2\n' + ' ! Line 3'
        );
    });
});
