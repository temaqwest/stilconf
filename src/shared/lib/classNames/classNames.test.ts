import { classNames } from './classNames'

describe('ClassNames helper', () => {
	test('Только с одним параметром cls', () => {
		expect(classNames('somebody')).toBe('somebody ')
	})

	test('1 Мода в состоянии true', () => {
		expect(classNames('somebody', { once: true })).toBe('somebody once')
	})

	test('1 Мода в состоянии false', () => {
		expect(classNames('somebody', { once: false })).toBe('somebody ')
	})

	test('Всё вместе: основной класс, 1 мода в true и 2 additional класса', () => {
		expect(classNames('somebody', { once: true }, ['told', 'me'])).toBe(
			'somebody told me once'
		)
	})

	test('Мода в состоянии undefined: ожидается, что она не добавляется в итоговый класс', () => {
		expect(classNames('somebody', { once: undefined })).toBe(
			'somebody '
		)
	})
})
