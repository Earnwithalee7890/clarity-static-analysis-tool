;; Safe Sample Contract
;; This contract follows best practices.

(define-constant owner tx-sender)

(define-public (safe-transfer (amount uint))
    (begin
        ;; OK: Using contract-caller for auth
        (asserts! (is-eq contract-caller owner) (err u100))
        
        ;; OK: Checking return value with unwrap! or try!
        (unwrap! (as-contract (stx-transfer? amount tx-sender 'SP123...)) (err u101))
        
        (ok true)
    )
)

(define-read-only (check-height-safe)
    ;; OK: Using inequality check
    (if (>= block-height u1000)
        true
        false
    )
)
