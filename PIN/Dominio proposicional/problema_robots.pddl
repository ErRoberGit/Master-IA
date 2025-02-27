(define (problem problema_robots) (:domain dominio_robots)
    (:objects r1 r2 - robot
              t1 t2 - taza
              p1 p2 - persona
              l1 l2 l3 l4 lp - lugar
              a1 - armario
              m1 - maquina
              b1 b2 - brazo
    )
    (:init
        (at r1 l1)
        (at r2 l3)
        (at p1 l2)
        (at p2 l3)
        (at m1 l1)
        (at a1 l3)

        (on t1 a1)
        (on t2 a1)

        (linked l1 l2)
        (linked l2 l1)
        (linked l1 lp)
        (linked lp l1)
        (linked l2 lp)
        (linked lp l2)
        (linked l3 l4)
        (linked l4 l3)
        (linked l3 lp)
        (linked lp l3)
        (linked l4 lp)
        (linked lp l4)

        (allowed r1 l1)
        (allowed r1 l2)
        (allowed r1 lp)
        (allowed r2 l3)
        (allowed r2 l4)
        (allowed r2 lp)

        (empty t1)
        (empty t2)

        (libre b1 r1)
        (libre b2 r1)
        (libre b1 r2)
        (libre b2 r2)
    )
    (:goal (and (on t1 p1) (on t2 p2) (full t1) (full t2))
    )
)
