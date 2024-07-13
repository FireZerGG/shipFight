import headerStyles from "./header.module.css"

export function Header() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.heading}>Морской бой или что-то типа того</div>
            <button className={headerStyles.btn}>Найти игру</button>
        </header>
    );
}