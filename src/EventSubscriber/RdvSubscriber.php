<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Rdv;
use App\Entity\Status;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use \Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class RdvSubscriber implements EventSubscriberInterface
{
    private $tokenStorage;
    private $em;

    public function __construct(
        EntityManagerInterface $em,
        TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['processDefaultRdvValues', EventPriorities::PRE_WRITE],
        ];
    }

    public function processDefaultRdvValues(GetResponseForControllerResultEvent $event)
    {
        $rdv = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$rdv instanceof Rdv || Request::METHOD_POST !== $method) {
            return;
        }
        $status = $this->getDefaultStatus();
        $patient = $this
            ->tokenStorage
            ->getToken()
            ->getUser();

        $rdv
            ->setPatient($patient)
            ->setStatus($status);
    }

    private function getDefaultStatus()
    {
        return $this
            ->em
            ->getRepository(Status::class)
            ->findOneBy([
                'name' => 'requested'
            ]);
    }
}
