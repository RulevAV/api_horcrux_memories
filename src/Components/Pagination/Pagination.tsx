
import React, { useState } from 'react';
import { PaginationPropsType } from './types';

type PropsType = PaginationPropsType;

const ItemInterval = (page: number, sizePage: number, portionsSize: number,) => {
    //Количество ячеек
    let balance = portionsSize % 2;
    let call = Math.floor(portionsSize / 2)
    let start = page - call + 1 - balance;//1-оставшейся ячейка
    let end = page + call;

    //коректируем интервал
    if (start < 1) {
        let correct = 1 - start;
        start = start + correct;
        end = end + correct;
        end = end > sizePage ? sizePage : end;
        return { start, end }

    }

    if (end > sizePage) {
        let correct = sizePage - end;
        start = start + correct;
        end = end + correct;
        return { start, end }
    }

    return { start, end }
}

export const Pagination: React.FC<PropsType> = ({ idParent, nameParent, page, sizePage, portionsSize, changePage }) => {
    const [newPages, setNewPages] = useState(0);
    const { start, end } = ItemInterval(page, sizePage, portionsSize);
    let items = [];

    const _changeNewPage = (e: any) => {
        const value = e.target.value;
        if (!value || (value > 0 && value <= sizePage)) {
            setNewPages(value);
        }
    }

    const _changePage = (i: number) => {
        changePage({
            id: idParent,
            page: i,
            portionsSize,
            name: nameParent,
        });
    }

    const previous = (i: number) => {
        if (i > 0) {
            _changePage(i);
        }
    }

    const next = (i: number) => {
        if (i <= sizePage) {
            _changePage(i);
        }
    }

    const onBlur = () => {
        if (!newPages)
            setNewPages(page)

        if (newPages !== page)
            changePage({
                id: idParent,
                page: newPages,
                portionsSize,
                name: nameParent,
            });
    }

    const keyup = (e: any) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.target.blur();
        }
    }

    for (let i = start; i <= end; i++) {
        if (i === page)
            items.push(<li key={i} className="page-item active"> <div className="page-link">
                <span aria-hidden="true">{i}</span>
            </div></li>)
        else
            items.push(<li key={i} onClick={() => { _changePage(i) }} className="page-item"><div className="page-link" >
                <span role="button" aria-hidden="true">{i}</span>
            </div></li>)
    }

    return (
        <nav className="pagination-outer d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className="page-item ">
                    <div onClick={() => { previous(page - 1) }} className="page-link" >
                        <span role="button" aria-hidden="true">&laquo;</span>
                    </div>
                </li>
                {items}
                <li className="page-item">
                    <div onClick={() => { next(page + 1) }} className="page-link">
                        <span role="button" aria-hidden="true">&raquo;</span>
                    </div>
                </li>
                <li className="page-item">
                    <input value={newPages} onKeyUp={keyup} onBlur={onBlur} onChange={_changeNewPage} className='page-link' style={{ width: "60px" }} />
                </li>
                <li className="page-item d-flex align-items-center">
                    <span className='ms-3'>Количество страниц: {sizePage}</span>
                </li>
            </ul>
        </nav>
    )
};