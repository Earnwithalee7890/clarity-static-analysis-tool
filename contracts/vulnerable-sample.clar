;; Vulnerable Sample Contract
;; This contract contains intentional issues for the scanner to detect.

(define-public (unsafe-transfer (amount uint))
    (begin
        ;; ISSUE: Using tx-sender in assertions (phishing risk)
        (asserts! (is-eq tx-sender (var-get owner)) (err u100))
        
        ;; ISSUE: Unchecked return value
        (contract-call? .token transfer amount tx-sender 'SP123...)
        
        (ok true)
    )
)

(define-read-only (check-height)
    ;; ISSUE: Strict block height equality
    (if (is-eq block-height u1000)
        true
        false
    )
)
