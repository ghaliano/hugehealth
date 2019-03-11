<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\SignupType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\EncoderInterface;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/signup", name="auth")
     */
    public function index(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $user = new User();
        $form = $this->createForm(SignupType::class, $user);
        $form->submit(
            json_decode($request->getContent(), true)
        );
        $em = $this->getDoctrine()->getManager();

        $user->setPassword(
            $encoder->encodePassword(
                $user,
                $user->getPlainPassword()
            )
        );

        $em->persist($user);
        $em->flush();

        return new JsonResponse(
            ['status' => Response::HTTP_CREATED]
        );
    }
}
