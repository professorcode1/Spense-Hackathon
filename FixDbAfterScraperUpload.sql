\c spensehackdb
SELECT setval(
    pg_get_serial_sequence('users','id'),
    (
        SELECT GREATEST(
            MAX(id)+1,
            nextval(
                pg_get_serial_sequence('users','id')
                )
            )-1 
        FROM users
    )
)


SELECT setval(
    pg_get_serial_sequence('category','id'),
    (
        SELECT GREATEST(
            MAX(id)+1,
            nextval(
                pg_get_serial_sequence('category','id')
                )
            )-1 
        FROM users
    )
)


SELECT setval(
    pg_get_serial_sequence('brand','id'),
    (
        SELECT GREATEST(
            MAX(id)+1,
            nextval(
                pg_get_serial_sequence('brand','id')
                )
            )-1 
        FROM users
    )
)


SELECT setval(
    pg_get_serial_sequence('product','id'),
    (
        SELECT GREATEST(
            MAX(id)+1,
            nextval(
                pg_get_serial_sequence('product','id')
                )
            )-1 
        FROM users
    )
)

