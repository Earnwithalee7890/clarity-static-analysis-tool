
;; Safe Contract for Static Analysis Testing

(define-constant CONTRACT-OWNER tx-sender)

(define-public (safe-transfer (amount uint))
    (begin
        ;; Access control
        (asserts! (is-eq tx-sender CONTRACT-OWNER) (err u100))
        ;; Proper return handling
        (try! (stx-transfer? amount tx-sender 'SP1234...))
        (ok true)
    )
)

(define-read-only (get-calc (a uint))
    ;; Read-only is fine
    (ok a)
)

(define-public (checked-delete (id uint))
    (begin
        (asserts! (is-eq tx-sender CONTRACT-OWNER) (err u100))
        (asserts! (is-some (map-get? data id)) (err u101))
        (ok (map-delete data id))
    )
)

(define-map data uint uint)
