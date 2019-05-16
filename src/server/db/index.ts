import * as mysql from 'mysql';


let pool = mysql.createPool({
    connectionLimit: 10,
    user: 'bookstore',
    password: 'rolo',
    host: 'localhost',
    database: 'books'
});

export const Query = (query: string, values?: any) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, [values], (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};
