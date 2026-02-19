
;; Vulnerable Contract for Static Analysis Testing

(define-public (risky-transfer (amount uint))
    ;; Rule CLR-006: Transfer without post-condition
    ;; Rule CLR-001: Unchecked return value (try! missing)
    (stx-transfer? amount tx-sender 'SP1234...) 
)

(define-public (phishing-risk)
    ;; Rule CLR-002: tx-sender in asserts!
    (asserts! (is-eq tx-sender 'SP1234...) (err u1))
    (ok true)
)

(define-public (divide-loose (a uint))
    ;; Rule CLR-007: Integer division
    (ok (/ a u2))
)

;; Rule CLR-005: Public function without auth check
(define-public (no-auth-check)
    (ok "anyone can call this")
)

;; Rule CLR-010: map-delete without check
(define-map data uint uint)
(define-public (unsafe-delete (id uint))
    (ok (map-delete data id))
)
