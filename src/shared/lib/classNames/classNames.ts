type className = string

type Mods = Record<className, boolean>
/**
 *
 * @param cls - название главного класса
 * @param mods - объект динамических классов, где ключ - название класса, а значение <boolean>, определяет, добавляется ли класс
 * @param additional - массив статичных классов
 */
export function classNames (cls: className, mods: Mods = {}, additional: string[] = []): string {
	return [
		cls,
		...additional.filter(Boolean),
		Object.entries(mods)
			.filter(([className, value]) => Boolean(value))
			.map(([className]) => className)
	].join(' ')
}
