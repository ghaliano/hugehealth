<?php

namespace App\DataProvider;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Paginator;
use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\Exception\ResourceClassNotSupportedException;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\RequestContext;

class UserDataProvider implements CollectionDataProviderInterface
{
    private $em;
    private $request;
    public function __construct(
        EntityManagerInterface $em,
        RequestStack $request
    )
    {
        $this->em = $em;
        $this->request = $request;
    }

    public function getCollection(string $resourceClass, string $operationName = null)
    {
        if (User::class !== $resourceClass) {
            throw new ResourceClassNotSupportedException();
        }

        $qb = $this->em->createQueryBuilder()
            ->select(
                'u, ( 6371
                      * acos( cos( radians(:latitude) )
                              * cos(  radians( u.latitude )   )
                              * cos(  radians( u.longitude ) - radians(:longitude) )
                            + sin( radians(:latitude) )
                              * sin( radians( u.latitude ) )
                            )
                    )
                    AS HIDDEN distance'
            )
            ->from(User::class, 'u')
            ->having('distance<:distance')
            ->setFirstResult(0)
            ->setMaxResults(100)
            ->setParameter('distance', $this->getParam('distance'))
            ->setParameter('latitude', $this->getParam('latitude'))
            ->setParameter('longitude', $this->getParam('longitude'));


        return new Paginator(
            new \Doctrine\ORM\Tools\Pagination\Paginator($qb)
        );
    }

    private function getParam($param){
        return $this->request->getCurrentRequest()->get($param);
    }
}
