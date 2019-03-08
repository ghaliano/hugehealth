<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\SignupType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\EncoderInterface;

class AuthController extends AbstractController
{
    /**
     * @Route("/api/signup", name="auth")
     */
    public function index(Request $request, EncoderInterface $encoder)
    {
        $user = new User();
        $form = $this->createForm(SignupType::class, $user);
        $form->submit(
            json_decode($request->getContent(), true)
        );

        if ($form->isValid()){
            $em = $this->getDoctrine()->getManager();

            $user->setPassword(
                $encoder->passwordEncode(
                    $user->getPlainPassword(), $user
                )
            );

            $em->persist($user);
            $em->flush();
        } else {

            return new JsonResponse(
                ['status' => 'error'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
